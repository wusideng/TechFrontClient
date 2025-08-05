import {
  Button,
  Form,
  Input,
  Picker,
  Radio,
  TextArea,
  Toast,
  PickerRef,
  DatePicker,
  ImageUploader,
} from "antd-mobile";
import { RefObject } from "react";
import styles from "./style.module.less";
import { AddCircleOutline } from "antd-mobile-icons";
import moment from "moment";
import { FormItem } from "@/types/FormItem";
import { forwardRef, useImperativeHandle } from "react";

const FormComponent = forwardRef(
  (
    {
      onFinish,
      initialValues,
      formItems,
      loading = false,
    }: {
      onFinish: (vals: any) => void;
      initialValues: any;
      formItems: FormItem[];
      loading?: boolean;
    },
    ref
  ) => {
    const [form] = Form.useForm();
    const handleFinishFailed = (errorInfo) => {
      const errorfield = errorInfo.errorFields[0].errors[0];
      Toast.show({
        content: errorfield,
      });
      return;
    };
    useImperativeHandle(ref, () => ({
      form,
    }));
    const handleSubmit = (values) => {
      const processedValues = Object.keys(values).reduce((acc, key) => {
        const formItem = formItems.find((item) => item.name === key);

        if (
          formItem &&
          formItem.type === "picker" &&
          Array.isArray(values[key])
        ) {
          acc[key] = values[key][0]; // 取数组的第一个元素
        } else if (formItem && formItem.type === "datepick") {
          acc[key] = moment(values[key]).format("YYYY-MM-DD HH:mm:ss");
        } else if (
          formItem &&
          formItem.type === "single_image" &&
          Array.isArray(values[key])
        ) {
          acc[key] = values[key][0].url;
        } else {
          acc[key] = values[key];
        }

        return acc;
      }, {});
      onFinish(processedValues);
    };
    const formattedInitialValues = Object.keys(initialValues).reduce(
      (acc, key) => {
        const formItem = formItems.find((item) => item.name === key);

        if (formItem && formItem.type === "picker") {
          acc[key] = initialValues[key] ? [initialValues[key]] : [];
        } else if (formItem && formItem.type === "datepick") {
          acc[key] = initialValues[key]
            ? moment(initialValues[key]).toDate()
            : null;
        } else if (formItem && formItem.type === "single_image") {
          acc[key] = initialValues[key] ? [{ url: initialValues[key] }] : [];
        } else {
          acc[key] = initialValues[key];
        }

        return acc;
      },
      {}
    );
    const renderItemContent = (item) => {
      const placeholder =
        item.placeholder !== null && item.placeholder !== undefined
          ? item.placeholder
          : `请输入${item.label}`;
      if (item.type === "input") {
        if (item.inputType) {
          return <Input type={item.inputType} placeholder={placeholder} />;
        }
        return <Input placeholder={placeholder} />;
      }
      if (item.type === "textarea") {
        return <TextArea placeholder={placeholder} />;
      }
      if (item.type === "radio") {
        return (
          <Radio.Group>
            {item.options.map((option) => (
              <Radio value={option.value} key={option.value}>
                {option.label}
              </Radio>
            ))}
          </Radio.Group>
        );
      }
      if (item.type === "picker") {
        return (
          <Picker columns={[item.options]}>
            {(value) => {
              return value[0]?.value ? (
                value[0]?.value
              ) : (
                <div className={styles.placeholder}>请选择{item.label}</div>
              );
            }}
          </Picker>
        );
      }
      if (item.type === "datepick") {
        const today = moment();
        const minDate = today.toDate();
        const maxDate = today.clone().add(1, "year").toDate();

        return (
          <DatePicker
            title={`请选择${item.label}`}
            min={item.minDate || minDate}
            max={item.maxDate || maxDate}
          >
            {(value) =>
              value ? (
                value.toLocaleDateString()
              ) : (
                <div className={styles.placeholder}>请选择{item.label}</div>
              )
            }
          </DatePicker>
        );
      }
      if (item.type === "single_image") {
        return (
          <ImageUploader
            onDelete={() => {
              // 清理表单字段值
              form.setFieldValue(item.name, []);
            }}
            value={form.getFieldValue(item.name)}
            maxCount={1}
            upload={item.upload || (() => Promise.resolve({ url: "" }))}
          />
        );
      }
      return null;
    };
    const renderArray = (item) => {
      return (
        <Form.Item
          name={item.name}
          className={styles.array}
          noStyle
          rules={item.rules}
          extra={item.extra}
        >
          <Form.Array
            name={item.name}
            onAdd={(operation) => operation.add({ name: "" })}
            renderAdd={() => (
              <span>
                <AddCircleOutline /> 添加
              </span>
            )}
            renderHeader={({ index }, { remove }) => (
              <>
                <span>
                  {item.arrayLabel}
                  {index + 1}
                </span>
                <a onClick={() => remove(index)} style={{ float: "right" }}>
                  删除
                </a>
              </>
            )}
          >
            {(fields) =>
              fields.map(({ index }) => (
                <>
                  {item.arryColumns.map((column) => {
                    return (
                      <Form.Item
                        key={item.name}
                        name={[index, column.name]}
                        label={column.label}
                        rules={column.rules}
                        extra={item.extra}
                      >
                        {renderItemContent(column)}
                      </Form.Item>
                    );
                  })}
                </>
              ))
            }
          </Form.Array>
        </Form.Item>
      );
    };
    const renderItem = (item) => {
      const placeholder =
        item.placeholder !== null && item.placeholder !== undefined
          ? item.placeholder
          : `请输入${item.label}`;
      if (item.type === "picker") {
        return (
          <Form.Item
            key={item.name}
            extra={item.extra}
            name={item.name}
            label={item.label}
            rules={item.rules}
            trigger="onConfirm"
            onClick={(e, pickerRef: RefObject<PickerRef>) => {
              pickerRef.current?.open();
            }}
          >
            {renderItemContent(item)}
          </Form.Item>
        );
      } else if (item.type == "hidden") {
        return (
          <Form.Item
            name={item.name}
            key={item.name}
            extra={item.extra}
            style={{ display: "none" }}
            label={item.label}
            rules={[{ required: false }]}
          >
            <Input placeholder={placeholder} />
          </Form.Item>
        );
      }
      if (item.type === "datepick") {
        return (
          <Form.Item
            name={item.name}
            label={item.label}
            key={item.name}
            rules={item.rules}
            extra={item.extra}
            trigger="onConfirm"
            onClick={(e, pickerRef: RefObject<PickerRef>) => {
              pickerRef.current?.open();
            }}
          >
            {renderItemContent(item)}
          </Form.Item>
        );
      }
      if (item.type === "array") {
        return renderArray(item);
      }
      return (
        <Form.Item
          name={item.name}
          label={item.label}
          rules={item.rules}
          extra={item.extra}
          key={item.name}
        >
          {renderItemContent(item)}
        </Form.Item>
      );
    };
    return (
      <div className={styles.wrapper}>
        <Form
          form={form}
          style={{ "--border-top": "none" }}
          layout="horizontal"
          onFinish={handleSubmit}
          onFinishFailed={handleFinishFailed}
          initialValues={formattedInitialValues}
        >
          {formItems.map((item) => renderItem(item))}
        </Form>
        <div className={"form_component_button_wrapper"}>
          <Button
            block
            type="submit"
            color="primary"
            loading={loading}
            onClick={() => {
              form.submit();
            }}
          >
            提交
          </Button>
        </div>
      </div>
    );
  }
);

export default FormComponent;

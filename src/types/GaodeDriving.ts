export type DrivingResult = {
  destination: {
    lat: number;
    lng: number;
  };
  origin: {
    lat: number;
    lng: number;
  };
  end: {
    location: {
      lat: number;
      lng: number;
      name: string; //"终点"
      type: string; //"end"
    };
  };
  start: {
    location: {
      lat: number;
      lng: number;
      name: string; //"起点"
      type: string; //"start"
    };
  };
  taxi_cost: number; //10 （单位元）
  routes: DrivingRoute[];
};
interface DrivingRoute {
  distance: number; //距离 单位米
  policy: string; // "速度最快" "距离最短" "不走高速"
  restriction: number; //限行结果,0 代表限行已规避或未限行，即该路线没有限行路段,1 代表限行无法规避，即该线路有限行路段
  time: number; //预计时间 单位秒
  tolls: number; //预计过路费 单位元
  tolls_distance: number; //预计过路费距离 单位米
  steps: DrivingStep[];
}
interface DrivingStep {
  action: string; //"直行","左转","右转","掉头","环岛行驶"
  assistant_action: string;
  cities: {
    adcode: string;
    citycode: string;
    name: string; // city name
    districts: {
      adcode: string;
      name: string; //district name, e.g., "朝阳区"
    }[];
  }[];
  distance: number; // 米
  end_location: { lng: number; lat: number };
  instruction: string; //"向西北行驶33米左转"
  orientation: string; //"西北"
  path: {
    lng: number;
    lat: number;
  }[];
  road: string;
  start_location: { lng: number; lat: number };
  time: number; //秒
  tmcs: {
    distance: number;
    lcode: any[]; //不知道这个有啥用
    path: {
      lng: number;
      lat: number;
    }[];
    status: string; //"未知",
    polyline: string; //"点串编码",
  }[];
  tmcsPaths: {
    distance: number;
    path: { lng: number; lat: number }[];
    status: string; //"未知",
  }[];
  toll_distance: number; // 米
  toll_road: string; // 路名
  tolls: number; // 单位元
}

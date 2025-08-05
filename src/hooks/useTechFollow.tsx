import { useAppDispatch, useAppSelector } from "@/store";
import {
  followTechAction,
  unfollowTechAction,
} from "@/store/slices/followSlice";
import { TechUser } from "@/types/Tech";
import { generateRandomNumberFromName } from "@/util/utils";

const useTechFollow = (techuser: TechUser) => {
  const dispatch = useAppDispatch();
  const { followingTechOpenids, followsMap } = useAppSelector(
    (state) => state.follow
  );
  const { user } = useAppSelector((state) => state.user);
  const followed = followingTechOpenids.includes(techuser.openid);
  const follow = async () => {
    if (followed) {
      dispatch(
        unfollowTechAction({
          userOpenid: user.openid,
          techOpenid: techuser.openid,
        })
      );
    } else {
      dispatch(
        followTechAction({
          userOpenid: user.openid,
          techOpenid: techuser.openid,
        })
      );
    }
  };
  return {
    follow,
    followed,
    followNumber:
      followsMap[techuser.openid] +
      generateRandomNumberFromName(techuser.user_nickname),
  };
};
export default useTechFollow;

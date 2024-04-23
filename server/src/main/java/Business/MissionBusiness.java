package Business;

import Data.DataBase;
import Models.Mission;

import java.io.IOException;
import java.util.ArrayList;

public class MissionBusiness {
    private static final String SUCCESS_MSG = "success";
    private static final String WRITE_TO_DB_ERROR = "no write to db error";
    private static final String NO_FOUND_ERROR = "mission don't exist";
    private static final String EXISTING_MISSION_ERROR = "mission already exist";

    public ArrayList<Mission> getALlMissions() {
        return DataBase.getInstance().missions;
    }

    public String addMssion(Mission newMission) {
        if (newMission != null) {
            Mission existedMission = getALlMissions().stream()
                    .filter(mission -> newMission.getId().equals(mission.getId()))
                    .findAny()
                    .orElse(null);
            if (existedMission == null) {
                try {
                    DataBase.getInstance().insert(newMission);
                } catch (IOException e) {
                    return WRITE_TO_DB_ERROR;
                }
                return SUCCESS_MSG;
            } else {
                return NO_FOUND_ERROR;
            }
        }
        return EXISTING_MISSION_ERROR;
    }

    public String removeMissionById(Long idToDelete) {
        Mission missionToRemove = getALlMissions().stream()
                .filter(mission -> idToDelete.equals(mission.getId()))
                .findAny()
                .orElse(null);
        if (missionToRemove != null){
            try {
                DataBase.getInstance().delete(missionToRemove);
            } catch (IOException e) {
                return WRITE_TO_DB_ERROR;
            }
            return SUCCESS_MSG;
        }
        return NO_FOUND_ERROR;
    }

    public String changeStatusById(Long missionId) {
        Mission missionToChangeStatus = getALlMissions().stream()
                .filter(mission -> missionId.equals(mission.getId()))
                .findAny()
                .orElse(null);
        if (missionToChangeStatus != null) {
            missionToChangeStatus.changeCompleteMode();
            try {
                DataBase.getInstance().writeDataToDB();
            } catch (IOException e) {
                return WRITE_TO_DB_ERROR;
            }
            return SUCCESS_MSG;
        }
        return NO_FOUND_ERROR;
    }
}

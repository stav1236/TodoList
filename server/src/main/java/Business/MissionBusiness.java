package Business;
import Data.DataBase;
import Models.Mission;

import java.io.IOException;
import java.util.ArrayList;

public class MissionBusiness {
    public ArrayList<Mission> getALlMissions(){
        return DataBase.getInstance().missions;
    }
    public String addMssion (Mission newMission){
        if (newMission != null) {
            Mission existedYoung = getALlMissions().stream()
                    .filter(mission -> newMission.getName().equals(mission.getName()))
                    .findAny()
                    .orElse(null);
            if (existedYoung == null) {
                try {
                    DataBase.getInstance().insert(newMission);
                } catch (IOException e) {
                    return "no write to db";
                }
                return "success";
            } else {
                return "there is mission with the same name";
            }
        } else {
            return "not Valid input";
        }
    }

    public String removeMissionById(Long idToDelete){
        Mission missionToDelete = null;
        for (Mission mission:
             getALlMissions()) {
            if (mission.getId() == idToDelete){
                missionToDelete = mission;
                System.out.println("==============");
                System.out.println("mission");
                System.out.println(mission);
                System.out.println("missionToDelete");
                System.out.println(missionToDelete);
                System.out.println("==============");

            }

        }
        if (missionToDelete != null) {
            try {
                DataBase.getInstance().delete(missionToDelete);
            } catch (IOException e) {
                return "no write to db";
            }
            return "success";
        } else {
            return "mission dont exist";
        }
    }
}

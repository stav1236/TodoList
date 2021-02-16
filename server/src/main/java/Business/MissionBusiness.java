package Business;
import Data.DataBase;
import Models.Mission;

import java.util.ArrayList;

public class MissionBusiness {
    public ArrayList<Mission> getALlMissions(){
        return DataBase.getInstance().missions;
    }
}

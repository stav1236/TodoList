package Data;

import Models.Mission;
import Models.Young;

import com.google.gson.Gson;

import org.json.simple.JSONArray;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

import java.io.*;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;

public class DataBase {
    //Singleton class
    private static DataBase dataBase = null;
    public ArrayList<Mission> missions;

    //init Data Base
    private DataBase() {
        this.missions = new ArrayList<>();
        Gson gson = new Gson();
        JSONParser jsonParser = new JSONParser();
        JSONArray jsonArray = null;
        try {
            jsonArray = (JSONArray) jsonParser.parse(new FileReader("src/main/resources/db.json"));
            for (Object var : jsonArray) {
                Mission mission = gson.fromJson(var.toString(), Mission.class);
                missions.add(mission);
            }
        } catch (IOException e) {
            e.printStackTrace();
        } catch (ParseException e) {
            e.printStackTrace();
        }
    }

    public void writeDataToDB() throws IOException {
        Gson gsonIncludedAllFields = new Gson();
        try (FileWriter file = new FileWriter("src/main/resources/db.json")) {
            file.write(gsonIncludedAllFields.toJson(this.missions));
            file.flush();
        }
    }

    public void insert(Mission newMission) throws IOException {
        this.missions.add(newMission);
        writeDataToDB();
    }

    public void delete(Mission newMission) throws IOException {
        this.missions.remove(newMission);
        writeDataToDB();
    }

    public static DataBase getInstance() {
        if (dataBase == null)
            dataBase = new DataBase();
        return dataBase;
    }

}

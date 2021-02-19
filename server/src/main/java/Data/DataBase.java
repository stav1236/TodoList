package Data;

import Models.Mission;

import com.google.gson.Gson;

import org.json.simple.JSONArray;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

import java.io.*;
import java.util.ArrayList;

public class DataBase {
    //Singleton class
    private static final String DB_PATH = "src/main/resources/db.json";
    private static DataBase dataBase = null;
    public ArrayList<Mission> missions;

    //init Data Base
    private DataBase() {
        this.missions = new ArrayList<>();
        Gson gson = new Gson();
        JSONParser jsonParser = new JSONParser();
        JSONArray jsonArray = null;
        try {
            jsonArray = (JSONArray) jsonParser.parse(new FileReader(DB_PATH));
            for (Object var : jsonArray) {
                Mission mission = gson.fromJson(var.toString(), Mission.class);
                missions.add(mission);
            }
        } catch (IOException | ParseException e) {
            e.printStackTrace();
        }
    }

    public void writeDataToDB() throws IOException {
        Gson gsonIncludedAllFields = new Gson();
        try (FileWriter file = new FileWriter(DB_PATH)) {
            file.write(gsonIncludedAllFields.toJson(this.missions));
            file.flush();
        }
    }

    public void insert(Mission newMission) throws IOException {
        this.missions.add(newMission);
        writeDataToDB();
    }

    public void delete(Mission mission) throws IOException {
        this.missions.remove(mission);
        writeDataToDB();
    }

    public static DataBase getInstance() {
        if (dataBase == null)
            dataBase = new DataBase();
        return dataBase;
    }

}

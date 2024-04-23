package UI;

import java.util.HashMap;

import Business.MissionBusiness;
import Models.Mission;
import spark.*;
import com.google.gson.Gson;

public final class App {
    private static final HashMap<String, String> corsHeaders = new HashMap<>();
    private static final String SUCCESS_MSG = "success";
    private static final int ERROR_CODE = 500;

    static {
        corsHeaders.put("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
        corsHeaders.put("Access-Control-Allow-Origin", "*");
        corsHeaders.put("Access-Control-Allow-Headers", "*");
    }

    public static void apply() {
        Filter filter = (request, response) -> corsHeaders.forEach(response::header);
        Spark.after(filter);
    }

    public static void main(String[] args) {
        MissionBusiness missionBusiness = new MissionBusiness();

        Gson gsonIncludedAllFields = new Gson();

        App.apply(); // Call this before mapping thy routes

        //Back To The Future
        Spark.get("/allMissions", ((request, response) -> gsonIncludedAllFields.toJson(missionBusiness.getALlMissions())));
        Spark.post("/insertMission", ((request, response) -> {
            Mission newMission = gsonIncludedAllFields.fromJson(request.body(), Mission.class);
            String responseBody = missionBusiness.addMssion(newMission);
            if (!responseBody.equals(SUCCESS_MSG))
                response.status(ERROR_CODE);
            return responseBody;
        }));
        Spark.post("/removeMission", ((request, response) -> {
            Long missionIdToDelete = Long.parseLong(request.body());
            String responseBody = missionBusiness.removeMissionById(missionIdToDelete);
            if (!responseBody.equals(SUCCESS_MSG))
                response.status(ERROR_CODE);
            return responseBody;
        }));
        Spark.post("/checkMission", ((request, response) -> {
            Long missionId = Long.parseLong(request.body());
            String responseBody = missionBusiness.changeStatusById(missionId);
            if (!responseBody.equals(SUCCESS_MSG))
                response.status(ERROR_CODE);
            return responseBody;
        }));
    }
}

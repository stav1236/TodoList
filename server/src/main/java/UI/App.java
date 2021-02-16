package UI;

import java.util.HashMap;

import Business.MissionBusiness;
import com.google.gson.GsonBuilder;
import spark.*;
import com.google.gson.Gson;

public final class App {
    private static final HashMap<String, String> corsHeaders = new HashMap<>();

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
        Gson gsonIncludeJustExpose = new GsonBuilder().excludeFieldsWithoutExposeAnnotation()
                .create();

        App.apply(); // Call this before mapping thy routes

        //Back To The Future
        Spark.get("/allMissions", ((request, response) -> gsonIncludedAllFields.toJson(missionBusiness.getALlMissions())));
//        Spark.get("/specificYoungDetails/:id", ((request, response) -> {
//            int youngId = Integer.parseInt(request.params(":id"));
//            return gsonIncludedAllFields.toJson(youngBusiness.specificDetailsOfYoung(youngId));
//        }));
//        Spark.post("/insertYoung", ((request, response) -> {
//            Young newYoung = gsonIncludedAllFields.fromJson(request.body(), Young.class);
//            String responseBody = youngBusiness.addYoungByObject(newYoung);
//            if(responseBody != "success")
//                response.status(500);
//            return responseBody;
//        }));
////
//        Spark.post("/removeYoung/:id", ((request, response) -> {
//            int idToDelete = Integer.parseInt(request.params(":id"));
//            String responseBody =youngBusiness.removeYoungById(idToDelete);
//            if(responseBody != "success")
//                response.status(500);
//            return responseBody;
//        }));
    }
}

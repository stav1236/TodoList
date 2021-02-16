package Models;

import com.google.gson.annotations.Expose;

public class Young {
    @Expose
    private Integer id;
    @Expose
    private String name;
    @Expose
    private String place;
    @Expose
    private String phone;
    private SpecificDetails specificDetails;

    public SpecificDetails getSpecificDetails() {
        return this.specificDetails;
    }

    public int getId() {
        return this.id;
    }

    public boolean isValid() {
        return (this.id != null && this.name != null && this.place != null
                && this.phone != null && this.specificDetails.isNotNull());
    }

    public Young(Integer id, String name, String place, String phone, SpecificDetails specificDetails) {
        this.id = id;
        this.place = place;
        this.name = name;
        this.phone = phone;
        this.specificDetails = specificDetails;
    }
}

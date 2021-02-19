package Models;

public class Mission {
    private Long id;
    private String name;
    private Boolean complete;

    public String getName() {
        return name;
    }
    public Long getId() {
        return id;
    }

    public void changeCompleteMode() {
        this.complete = !(this.complete);
    }

    public Mission(Long id, String name, Boolean complete) {
        this.id = id;
        this.name = name;
        this.complete = complete;
    }
}

package Models;

public class SpecificDetails {
    private String hobby;
    private String favoriteBook;

    public SpecificDetails(String hobby, String favoriteBook) {
        this.hobby = hobby;
        this.favoriteBook = favoriteBook;
    }

    public boolean isNotNull() {
        return this.hobby != null && this.favoriteBook != null;
    }
}

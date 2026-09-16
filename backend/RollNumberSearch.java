
public class RollNumberSearch {
    public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);

        int[] rollNumbers = new int[5];

        System.out.println("Enter 5 roll numbers:");

        for (int i = 0; i < 5; i++) {
            rollNumbers[i] = sc.nextInt();
        }

        System.out.println("Enter roll number to search:");
        int search = sc.nextInt();

        boolean found = false;

        for (int i = 0; i < 5; i++) {
            if (rollNumbers[i] == search) {
                found = true;
                break;
            }
        }

        if (found) {
            System.out.println("Element found");
        } else {
            System.out.println("Element not found");
        }

        sc.close();
    }
}
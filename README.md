# Front-end Tech Challenge README

Welcome to the front-end tech challenge! This project showcases an intuitive UI designed for administrators to manage planetary data, transactions, and residents details. Here's a quick guide to navigating through the application:

## Features

### Language Selector

The UI provides a language selector allowing users to toggle between Galactic Basic and Droidobesh Depot.

### Dashboard

The dashboard offers additional insights into the planetary data, including:

- **Top Three Planets by Currency**: Displays the top three planets based on currency.
- **Percentage of Currency by Total Transactions**: Visualizes the percentage of each currency by the total number of transactions.

### Planets Page

On the Planets page, administrators can:

- **Sort Planets**: Sorts planets alphabetically by name in ascending or descending order.
- **Filter by Currency**: Filters planets based on the currency they operate with.
- **Search by Name**: Utilizes Fuse.js for fuzzy searching, enabling administrators to search for planets by approximate name matches.

### Planet Details Page

The Planet Details Page provides comprehensive information about a specific planet, including:

- **Planet Details**: Presents detailed information about the planet.
- **Resident Transactions**: Lists all transactions that occurred on the planet, utilizing user IDs to display resident names.
- **Chip Element for Status**: Enhances readability by utilizing chip elements to represent transaction statuses.

### UI Design

The UI design aims to simulate a spacecraft on-board computer, reminiscent of futuristic computer interfaces. Key design elements include:

- **4:3 Resolution**: Mimics the aspect ratio of traditional monitors.
- **Slight Blur**: Adds a touch of realism with a subtle blur effect.
- **Almost Monochrome**: Emulates a monochrome display for a vintage feel.
- **Scattered Lights**: Incorporates scattered lights to enhance the futuristic aesthetic.

![computer with a blue screen](https://github.com/joaodantas91/ledn-frontend-challenge-ui/tree/main/public/computer-reference-1.jpg)

![spacecraft on-board computer](https://github.com/joaodantas91/ledn-frontend-challenge-ui/tree/main/public/computer-reference-2.jpg)

### Types and Enums

The project emphasizes the use of Types and Enums for writing clean, reusable code and avoiding hard-coded values. Examples include:

```typescript
const planetsByCurrency: {
    [key in Currency]: Array<{name: string, numberOfTransactions: number, id: string}>
} = {
    [Currency.ICS]: [],
    [Currency.GCS]: [],
}

const status = {
    [TransactionStatus.Blocked]: “Blocked”,
    [TransactionStatus.InProgress]: “In Progress”,
    [TransactionStatus.Completed]: “Completed”,
}
```

## How to Run the Project

Running the project is straightforward. Just follow these simple steps:

1. **Install Dependencies**: Open your terminal and navigate to the project directory. Then, run the following command to install all the necessary dependencies:

    ```
    npm install
    ```

2. **Start the Application**: After the installation is complete, start the application by running:

    ```
    npm start
    ```

3. **Access the Application**: Once the application is up and running, you can access it through your web browser. Open your preferred browser and navigate to the appropriate URL (`http://localhost:3000`).

If you encounter any issues during installation or running the project, feel free to reach out for assistance.

## Conclusion

In conclusion, this project was an exciting opportunity to apply a wide range of skills and tackle real-world challenges. Thank you for the opportunity to work on this tech challenge!

If you have any questions or feedback, feel free to reach out. Happy exploring!
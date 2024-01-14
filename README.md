# Client-Dashboard

## Dependencies
This service requires the gateway, users-service, and contract-service to function properly.

## Getting Started
To launch Client-Dashboard, use the command `Docker compose up` executed at the root of the project. This initiates the necessary services and sets up the environment for the application to run.

## Features
- **User Registration and Login:** Users must register and log in to access the tools provided by Client-Dashboard.
- **Role-Based Access Control:** The system implements a basic role verification mechanism. By default, a user is assigned the role of "commercial," which allows for managing contracts and accessing dashboards.
- **Dashboard Accessibility:** Access to dashboards is role-dependent. Users with the appropriate permissions can navigate to the dashboards by clicking the "Dashboard" button located on the right side of the header.
- **Navigation Flexibility:** A button labeled "Contracts" appears when users are viewing the dashboards. This button enables users to easily toggle back to the previous interface. To see this feature in action, refer to the GIF located at `./ToggleInterface.gif`.

![Navigation Flexibility](./ToggleInterface.gif)

The GIF demonstrates how users can switch between the dashboard view and the previous interface seamlessly, enhancing the user experience.

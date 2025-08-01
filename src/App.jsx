import React from 'react';
import AppRoutes from "./routes/AppRoutes";
import { AuthProvider } from "./contexts/AuthContext";
import { TodoProvider } from "./contexts/TodoContext";

const App = () => {
  return (
    <AuthProvider>
      <TodoProvider>
        <AppRoutes />
      </TodoProvider>
    </AuthProvider>
  );
};

export default App;

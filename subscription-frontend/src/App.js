import React, { useState, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';

// Компоненты
import Dashboard from './components/Dashboard';
import SubscriptionForm from './components/SubscriptionForm';
import SubscriptionList from './components/SubscriptionList';

// API
import { subscriptionAPI } from './services/api';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  const [subscriptions, setSubscriptions] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);

  // Загрузка подписок при запуске
  useEffect(() => {
    loadSubscriptions();
  }, []);

  const loadSubscriptions = async () => {
    try {
      // Пока бэкенд не готов, используем моковые данные
      const mockSubscriptions = [
        {
          id: 1,
          name: 'Netflix',
          price: 15,
          currency: 'USD',
          billing_cycle: 'monthly',
          next_billing_date: '2024-01-15',
          yearly_cost: 180
        },
        {
          id: 2,
          name: 'Spotify',
          price: 10,
          currency: 'USD',
          billing_cycle: 'monthly',
          next_billing_date: '2024-01-20',
          yearly_cost: 120
        }
      ];
      setSubscriptions(mockSubscriptions);
      
      // Когда бэкенд будет готов, раскомментируй:
      // const response = await subscriptionAPI.getAll();
      // setSubscriptions(response.data);
    } catch (error) {
      console.error('Ошибка загрузки подписок:', error);
    }
  };

  const handleAddSubscription = async (subscriptionData) => {
    try {
      // Моковое добавление
      const newSubscription = {
        id: Date.now(),
        ...subscriptionData,
        yearly_cost: subscriptionData.billing_cycle === 'monthly' 
          ? subscriptionData.price * 12 
          : subscriptionData.price
      };
      setSubscriptions(prev => [...prev, newSubscription]);
      
      // Когда бэкенд будет готов:
      // await subscriptionAPI.create(subscriptionData);
      // loadSubscriptions();
      
      setIsFormOpen(false);
    } catch (error) {
      console.error('Ошибка добавления подписки:', error);
    }
  };

  // Расчет общей статистики
  const totalMonthly = subscriptions.reduce((sum, sub) => sum + parseFloat(sub.price), 0);
  const totalYearly = subscriptions.reduce((sum, sub) => sum + parseFloat(sub.yearly_cost), 0);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={
              <>
                <Dashboard 
                  subscriptions={subscriptions}
                  onAddSubscription={() => setIsFormOpen(true)}
                  totalMonthly={totalMonthly}
                  totalYearly={totalYearly}
                />
                
                <SubscriptionForm
                  open={isFormOpen}
                  onClose={() => setIsFormOpen(false)}
                  onSave={handleAddSubscription}
                />

                <SubscriptionList
                  subscriptions={subscriptions}
                  onEdit={(sub) => console.log('Edit:', sub)}
                  onDelete={(id) => setSubscriptions(prev => prev.filter(s => s.id !== id))}
                />
              </>
            } />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
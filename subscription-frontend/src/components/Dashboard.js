import React from 'react';
import {
  Box,
  Paper,
  Typography,
  Grid,
  Button,
  Card,
  CardContent
} from '@mui/material';
import { Add } from '@mui/icons-material';

const Dashboard = ({ subscriptions, onAddSubscription, totalMonthly, totalYearly }) => {
  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" component="h1">
          Мои подписки
        </Typography>
        <Button 
          variant="contained" 
          startIcon={<Add />}
          onClick={onAddSubscription}
        >
          Добавить подписку
        </Button>
      </Box>

      {/* Статистика */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Всего подписок
              </Typography>
              <Typography variant="h5">
                {subscriptions.length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Месячные расходы
              </Typography>
              <Typography variant="h5">
                {totalMonthly} USD
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Годовые расходы
              </Typography>
              <Typography variant="h5">
                {totalYearly} USD
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Ближайшие списания */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Ближайшие списания
        </Typography>
        {subscriptions
          .filter(sub => {
            const today = new Date();
            const billingDate = new Date(sub.next_billing_date);
            const diffTime = billingDate - today;
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            return diffDays <= 7;
          })
          .map(subscription => (
            <Box key={subscription.id} sx={{ display: 'flex', justifyContent: 'space-between', py: 1 }}>
              <Typography>{subscription.name}</Typography>
              <Typography>
                {subscription.next_billing_date} - {subscription.price} {subscription.currency}
              </Typography>
            </Box>
          ))
        }
      </Paper>
    </Box>
  );
};

export default Dashboard;
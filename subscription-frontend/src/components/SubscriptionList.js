import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Chip,
  IconButton,
  Box
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';

const SubscriptionList = ({ subscriptions, onEdit, onDelete }) => {
  const getStatusColor = (nextBillingDate) => {
    const today = new Date();
    const billingDate = new Date(nextBillingDate);
    const diffTime = billingDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays <= 3) return 'error';
    if (diffDays <= 7) return 'warning';
    return 'success';
  };

  return (
    <Grid container spacing={2}>
      {subscriptions.map((subscription) => (
        <Grid item xs={12} sm={6} md={4} key={subscription.id}>
          <Card variant="outlined">
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="flex-start">
                <Typography variant="h6" component="h2">
                  {subscription.name}
                </Typography>
                <Box>
                  <IconButton size="small" onClick={() => onEdit(subscription)}>
                    <Edit />
                  </IconButton>
                  <IconButton size="small" onClick={() => onDelete(subscription.id)}>
                    <Delete />
                  </IconButton>
                </Box>
              </Box>
              
              <Typography color="textSecondary" gutterBottom>
                {subscription.price} {subscription.currency} / {subscription.billing_cycle}
              </Typography>
              
              <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
                <Chip 
                  label={`Следующее списание: ${subscription.next_billing_date}`}
                  color={getStatusColor(subscription.next_billing_date)}
                  size="small"
                />
                <Typography variant="body2">
                  Годовая стоимость: {subscription.yearly_cost} {subscription.currency}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default SubscriptionList;
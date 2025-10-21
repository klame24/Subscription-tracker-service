import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
  Box
} from '@mui/material';

const SubscriptionForm = ({ open, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    currency: 'USD',
    billing_cycle: 'monthly',
    next_billing_date: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    setFormData({
      name: '',
      price: '',
      currency: 'USD',
      billing_cycle: 'monthly',
      next_billing_date: ''
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Добавить подписку</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
            <TextField
              label="Название сервиса"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              fullWidth
            />
            <TextField
              label="Стоимость"
              name="price"
              type="number"
              value={formData.price}
              onChange={handleChange}
              required
              fullWidth
            />
            <TextField
              select
              label="Валюта"
              name="currency"
              value={formData.currency}
              onChange={handleChange}
              fullWidth
            >
              <MenuItem value="USD">USD</MenuItem>
              <MenuItem value="EUR">EUR</MenuItem>
              <MenuItem value="RUB">RUB</MenuItem>
            </TextField>
            <TextField
              select
              label="Период списания"
              name="billing_cycle"
              value={formData.billing_cycle}
              onChange={handleChange}
              fullWidth
            >
              <MenuItem value="monthly">Ежемесячно</MenuItem>
              <MenuItem value="yearly">Ежегодно</MenuItem>
            </TextField>
            <TextField
              label="Следующее списание"
              name="next_billing_date"
              type="date"
              value={formData.next_billing_date}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              required
              fullWidth
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Отмена</Button>
          <Button type="submit" variant="contained">Сохранить</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default SubscriptionForm;
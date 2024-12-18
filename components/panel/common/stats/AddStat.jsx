import { Drawer, message } from 'antd';
import axios from 'axios';
import React, { useState } from 'react'
import CreateStatForm from './createStatsForm';
import { API } from '@/config/APIs';

const AddStat = ({ open, setOpen }) => {
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (formData) => {
    const data = new FormData();
    setLoading(true)
    data.append('title', formData.title);
    data.append('number', formData.number);
    data.append('enabled', formData.enabled);
    data.append('icon', formData.icon);

    try {
      const response = await axios.post(`${API}/stat/create-stat`, data);
      // console.log(response, "<- response")
      message.success('Stat created successfully!');
    } catch (error) {
      console.log(error)
      message.error(error.message);
    } finally {
      setLoading(false)
    }
  };

  return <Drawer open={open} onClose={() => setOpen(false)}>
    <CreateStatForm
      onSubmit={handleSubmit}
      loading={loading}
      initValues={{
        title: '',
        number: '',
        enabled: true,
        icon: null
      }}
    />
  </Drawer>
}


export default AddStat
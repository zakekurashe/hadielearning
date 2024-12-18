import React, { useEffect, useState } from 'react'
import { Button, message, } from 'antd';
import CMSLayout from '@/components/panel/cms/CMSLayout';
import PanelHeading from '@/components/ui/common/PanelHeading';
import { BiStats } from 'react-icons/bi';
import { MdCreate } from 'react-icons/md';

import AllStatsAdmin from '@/components/panel/common/stats/AllStatsAdmin';
import AddStat from '@/components/panel/common/stats/AddStat';
import axios from 'axios';
import { API } from '@/config/APIs';
import UpdateStat from '@/components/panel/common/stats/UpdateStat';
import { useAuth } from '@/context/authContext';



const AdminStats = () => {

  const [auth] = useAuth()

  // add new one
  const [createNew, setCreateNew] = useState(false);

  // all stats
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);

  // for updates
  const [editStats, setEditStats] = useState(false)
  const [selected, setSelected] = useState({})
  const [loadingDelete, setLoadingDelete] = useState(false)


  const fetchStats = async () => {
    try {
      const { data } = await axios.get(`${API}/stat/admin-stats`);
      // console.log(data, "stats respon")
      setStats(data);
    } catch (error) {
      console.log(error)
      message.error('Failed to load stats');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (auth && auth?.token) fetchStats();
  }, [auth]);


  const deleteStats = async (ID) => {
    try {
      setLoadingDelete(true)
      const res = await axios.delete(`${API}/stat/delete-stat/${ID}`);
      console.log("delete stat", res);
      message.success("Deleted")
      fetchStats();
    } catch (error) {
      console.log(error);
      message.error(error?.message);
    } finally {
      setLoadingDelete(false)
    }
  }

  return (
    <CMSLayout>
      <PanelHeading Icon={<BiStats />} title="Website Stats" para={""} />
      <div className='d-flex justify-content-end align-items-center'>
        <Button onClick={() => setCreateNew(true)} icon={<MdCreate />} className='myBtn'>Create New Stats</Button>
      </div>

      <div className='my-4'>
        <AllStatsAdmin
          stats={stats}
          loading={loading}
          editStats={editStats}
          setEditStats={setEditStats}
          selected={selected}
          setSelected={setSelected}
          setStats={setStats}
          deleteStats={deleteStats}
          loadingDelete={loadingDelete}
        />
      </div>

      {/* {JSON.stringify(selected)} */}

      <AddStat open={createNew} setOpen={setCreateNew} />
      <UpdateStat open={editStats} setOpen={setEditStats} selected={selected} after={fetchStats} setSelected={setSelected} />

    </CMSLayout>
  )
}

export default AdminStats
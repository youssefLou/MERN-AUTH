import React from 'react'
import { useEffect } from 'react'
import { useNavigate} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux"
import GoalForm from '../components/goalForm'
import GoalItem from '../components/goalItem'
import { getGoals, reset } from '../features/goals/goalSlice'


function Dashboard() {
  const navigate = useNavigate()
  const dispatch = useDispatch() 
  const {user}=useSelector((state)=>state.auth)
  const {goals,isError,message} = useSelector((state)=>state.goals)
useEffect(() => {
  if (isError) {
    console.log(message);
  }
  if (!user) {
    navigate('/login');
  }
  dispatch(getGoals());

  return () => {
    dispatch(reset());
  };
}, [user, navigate, dispatch]);
  return (
    <>
      <section className='heading'>
        <h1>wellcome {user && user.name}</h1>
        <p>goals dashboard</p>
      </section>
      <GoalForm/>
      <section className='content'>
        {goals.length > 0 ? (
          <div className='goals'>
            {goals.map((goal) => (
              <GoalItem key={goal._id} goal={goal} />
            ))}
          </div>
        ) : (
          <h3>You have not set any goals</h3>
        )}
      </section>
    </>
    )
  
}

export default Dashboard
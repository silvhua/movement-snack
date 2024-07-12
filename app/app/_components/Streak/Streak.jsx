import Calendar from 'react-calendar';
import './Streak.scss';
import 'react-calendar/dist/Calendar.css';
import ActionIcon from '../ActionIcon/ActionIcon';
import { createDatesArray, formatDate } from '@/app/_libs/dataProcessing';

const Streak = ({recentSessions}) => {

  const circleProps = {
    src: './icons/radioButton.svg',
    className: 'streak__icon',
    href: null,
    label: 'M'
  }
  const checkMarkProps = {
    src: './icons/checkCircle.svg',
    className: 'streak__icon',
    href: null,
    label: 'M'
  }

  function StreakUnit({ iconProps }) {
    const { label } = iconProps;

    return (
      <div className='streak__day'>
        <p className='p2'>{label}</p>
        <ActionIcon
          iconProps={iconProps}
        />
      </div>
    )
  }

  /* 
  Determine which of the past few days have logged sessions
  */
  const past7Dates = createDatesArray();
  const normalizedSessionDates = recentSessions.map(session => {
    let sessionDate = new Date(session.created_time)
    sessionDate.setHours(0, 0, 0, 0)
    sessionDate = sessionDate.getTime();
    return sessionDate;
  })

  let iconProps = {
    className: 'streak__icon',
    href: null
  }
  return (
    <div className='streak'>
      {
        past7Dates.map((date, index) => {
          const sessionLogged = normalizedSessionDates.includes(date.getTime());
          const weekdayString = formatDate(
            date, { weekday: 'narrow' }
          )
          let img = '';
          sessionLogged ? img = 'checkCircle.svg' : img = 'radioButton.svg';
          const imgSrc = `./icons/${img}`;
          iconProps = {
            ...iconProps,
            src: imgSrc,
            label: weekdayString
          }
          return (
            <StreakUnit
              key={index}
              iconProps={iconProps}
            />
          )
        })
      }
      {/* <StreakUnit iconProps={checkMarkProps} />
      <StreakUnit iconProps={circleProps} /> */}
    </div>
  )
}

export default Streak

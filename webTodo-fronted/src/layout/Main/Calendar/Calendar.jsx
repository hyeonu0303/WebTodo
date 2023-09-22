/*eslint-disable */
import { changeDate } from "@/store/todoSlice";
import Calendar from "react-calendar";
import moment from 'moment';
import { useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { styled } from "styled-components";
import { selectMonth } from "@/store/dateSlice";
import './Calendar.css'

const ReactCalendar = (props) => {
  const dispatch = useDispatch();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [getMonthYear, setGetMonthYear] = useState(moment().format('YYYY-MM'));
  const [matchingDateArr, setMatchingDateArr] = useState([]);
  const [month, setMonth] = useState();
  const pickedDayNumber = useSelector(state=>state.date.selectDay);
  let formatdate = moment(selectedDate).format('YYYY-MM-DD');

  useEffect(()=>{
    dispatch(changeDate(formatdate));
  },[formatdate])
  
  useEffect(()=>{
    dispatch(selectMonth(getMonthYear))
  },[getMonthYear]) 
  
  const handleActiveStartDateChange = ({ activeStartDate, view }) => {
    if (view === 'month') { // 월 뷰일 때만 처리
      const newMonthYear = moment(activeStartDate).format('YYYY-MM');
      setGetMonthYear(newMonthYear);
      const newMonth = moment(activeStartDate).format('M');
      setMonth(newMonth);
    }
  };

  console.log(month);
  
  /**
   * 하루씩 더해가면서 매칭되는 날짜 담는 로직
   * @param {*} calendar 캘린더 날짜 가져옴
   * @returns 매칭된 날짜 배열에 담음
   */
  const addMatchingDate = (calendar) =>{
    const matchDate = [];
    const getThisMonth = calendar.getMonth();
    calendar.setDate(1); //그달의 첫날부터시작

    while (calendar.getMonth() == getThisMonth){
      if(calendar.getDay()==pickedDayNumber){
        const formatDate = moment(calendar).format('YYYY-MM-DD');
        matchDate.push(formatDate);
      }
      calendar.setDate(calendar.getDate() + 1)
    }
    return matchDate;
  }

  useEffect(() => {
    const calendarDate = moment(getMonthYear).toDate();
    const isMatchDateInMonth = addMatchingDate(calendarDate);
    setMatchingDateArr(isMatchDateInMonth);
    console.log(isMatchDateInMonth);
  }, [pickedDayNumber]);
  
  /**날짜변경 */
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  console.log(matchingDateArr);
  //입력한 날짜도 같이가져와서 같은날짜와 데이터면 보여줌
  const tileContent = ({ date }) => {
    if (!props.mark) {
      return null; 
    }

    if (props.mark.find((x) => x === moment(date).format("YYYY-MM-DD"))) {
      return <Dot />;
    }

    return null;
  };
  
  
  return(
    <>
      <Calendar 
        calendarType="hebrew" //일요일부터시작 지우면 월요일부터
        onChange={handleDateChange} //선택날짜 selectedDate변수에담아줌
        value={selectedDate} //날짜 선택
        minDetail="month" // 상단 네비게이션에서 '월' 단위만 보이게 설정
        maxDetail="month" // 상단 네비게이션에서 '월' 단위만 보이게 설정
        showNeighboringMonth={false} //  이전, 이후 달의 날짜는 보이지 않도록 설정
        next2Label={null} //>>모양제거
        prev2Label={null} //<<모양제거
        formatDay={(locale, date) => moment(date).format("DD")} //날짜 뒤 '일'제거
        tileContent={tileContent} //Dot넣어주기 위한것(Dot필요없으면 생략!)
        onActiveStartDateChange={handleActiveStartDateChange}
      />
      {/* 선택한날짜표시 */}
    </>
  );
}

export default ReactCalendar;

const Dot = styled.p`
    height: 8px;
    width: 8px;
    background-color: #f87171;
    border-radius: 50%;
    margin-left:10px;
    position:absolute;
  `
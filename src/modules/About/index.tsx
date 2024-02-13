import { Descriptions, DescriptionsProps } from "antd";
import { getInfo } from "../../lib/axios";
import { getItem } from "./lib/fn";
import { useTypedSelector } from "../../redux/hooks";

 export const About: React.FC = () => {
 const {info, isLoading, error} = useTypedSelector(state => state.info)

 if(isLoading || !info.data?.[0]) return <>Loading</>

 const {groupName, course, studentsNumber, semestr} = info.data?.[0]

 const items: DescriptionsProps['items'] = [
  getItem('groupName', 'Группа', groupName),
  getItem('studentsNumber', 'Количество курсантов', studentsNumber),
  getItem('course', 'Курс', course),
  getItem('semestr', 'Семестр', semestr)
  ];
 return <Descriptions items={items} column={{xs: 1, sm: 2, xl: 2, xxl: 2}} />;
 }
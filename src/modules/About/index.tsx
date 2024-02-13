import { Descriptions, DescriptionsProps } from "antd";
import { getInfo } from "../../lib/axios";
import { getItem } from "./lib/fn";
import { useTypedSelector } from "../../redux/hooks";

 export const About: React.FC<any> = ({data}: any) => {
 const {groupName, course, studentsNumber, semestr} = data

 const items: DescriptionsProps['items'] = [
  getItem('groupName', 'Группа', groupName),
  getItem('studentsNumber', 'Количество курсантов', studentsNumber),
  getItem('course', 'Курс', course),
  getItem('semestr', 'Семестр', semestr)
  ];
 return <Descriptions items={items} column={{xs: 1, sm: 2, xl: 2, xxl: 2}} />;
 }
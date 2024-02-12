import { Descriptions, DescriptionsProps } from "antd";
import { getInfo } from "../../lib/axios";
import { getItem } from "./lib/fn";

const {data} = getInfo();
const {groupName, course, studentsNumber, semestr} = data[0]

const items: DescriptionsProps['items'] = [
  getItem('groupName', 'Группа', groupName),
  getItem('studentsNumber', 'Количество курсантов', studentsNumber),
  getItem('course', 'Курс', course),
  getItem('semestr', 'Семестр', semestr)
  ];
  
 export const About: React.FC = () => <Descriptions items={items} column={{xs: 1, sm: 2, xl: 2, xxl: 2}} />;
import { BookFilled } from "@ant-design/icons"
import {Typography} from "antd"
import cls from './style.module.scss'

export const Header = () => <Typography.Title className={cls.title}>
    <BookFilled className={cls.icon}/> Конкретная авиационная техника (1-37 04 02-01)
</Typography.Title>
import type { FC } from 'react';
import zhCN from './locales/zhCN.json'
import enUS from './locales/enUS.json'
import useStore from "../store";
interface TProps {
    t: string
}

const T: FC<TProps> = (props) => {
    const { locale } = useStore.getState()
    const { t = '' } = props
    const langMap = {
        en: enUS,
        'zh-cn': zhCN
    }
    return <>{locale === 'en' ? t : langMap[locale][t]}</>;
}

export default T;

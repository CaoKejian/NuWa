import * as React from 'react'
import * as s from '../index.less'
import { xxx } from '../../utils'

const Upload: React.FC = () => {
  const uploadComponent = () => {
    xxx()
  }
  return <div className={s.wrapper} onClick={uploadComponent}>按钮</div>
}

export default Upload

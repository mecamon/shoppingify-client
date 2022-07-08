import React from "react"
import { DataForGraph } from "../../../models/models"
import { ResponsiveContainer, LineChart, XAxis, YAxis, Line, Tooltip, CartesianGrid, Legend } from "recharts"
import { useMonth } from "../../../hooks/useMonth"

export default function CustomLineGraph({dataForGraps, xDataKey, lineDataKey}: Props) {
  const [data, setData] = React.useState<any[]>([])
  const { monthNumberToName } = useMonth()

  React.useEffect(() => {
    dataForGraps.forEach(d => {
      const el = {}
      Object.defineProperty(el, xDataKey, {
        value: monthNumberToName(d.x) == 'no month' ? d.x :  monthNumberToName(d.x),
      }) 
      Object.defineProperty(el, lineDataKey, {
        value: d.y,
      }) 
      setData(data => [...data, el])
    })
  }, [])

  return (
    <>  
      <ResponsiveContainer width="100%" height={400} >
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={xDataKey} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey={lineDataKey} stroke="#F9A109" />
        </LineChart>
      </ResponsiveContainer>
    </>
  )
}

interface Props {
  dataForGraps: DataForGraph[]
  xDataKey: string
  lineDataKey: string
}

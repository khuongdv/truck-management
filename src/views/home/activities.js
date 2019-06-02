import dayjs from "dayjs";

export default [
  {
    id: 1, name: 'New truck created by admin. Its plate is 20A-12345.', time: dayjs().subtract(2, "hour"), action: 'create'
  },
  {
    id: 2, name: 'New truck created by admin. Its plate is 20A-33345.', time: dayjs().subtract(4, "hour"), action: 'create'
  },
  {
    id: 3, name: 'New truck created by admin. Its plate is 29A-11345.', time: dayjs().subtract(6, "hour"), action: 'create'
  },
  {
    id: 4, name: 'New truck deleted by admin', time: dayjs().subtract(7, "hour"), action: 'delete'
  },
  {
    id: 5, name: 'New truck created by admin', time: dayjs().subtract(9, "hour"), action: 'create'
  },
  {
    id: 6, name: 'New truck created by admin', time: dayjs().subtract(13, "hour"), action: 'create'
  },
  {
    id: 7, name: 'New truck created by admin', time: dayjs().subtract(21, "hour"), action: 'create'
  },
  {
    id: 8, name: 'New truck deleted by admin', time: dayjs().subtract(29, "hour"), action: 'delete'
  }
]

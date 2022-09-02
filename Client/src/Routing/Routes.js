import OurTube from "Pages/OurTube"
import Hi from "Pages/Hi"
import Index from "Pages/Index"

const Routes = [
  {
    title: 'Home',
    path: '/',
    exact: true,
    element: Index,
    restricted: false
  },
  {
    title: 'hi',
    path: '/hi',
    exact: true,
    element: Hi,
    restricted: false
  },
  {
    title: 'YouTube',
    path: '/youtube',
    exact: false,
    element: OurTube,
    restricted: false
  }
]

export default Routes
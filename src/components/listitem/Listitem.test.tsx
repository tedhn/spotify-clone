
import { render , screen } from '@testing-library/react'

import Listitem from './Listitem'

const mockData = {
  id : 1,
  title : 'song title'
  ,duration : 30000,
  dateAdded : "2020-02-01Tasdfasdf",
  album : {
    name : 'album name',
    id : "A",
    artists : [ {name : "artist name" , id : 'A'} ] ,
    images : [ {height : 2 , width : 2 , url : 'AAAAAAAAAAAAAAAA'}]
  }
}

describe("Listitem component" , () => {

  test('renders with all components with the correct text' , () => {
    // render(
		// 	<Listitem
		// 		key={mockData.id}
		// 		title={mockData.title}
		// 		duration={mockData.duration}
		// 		album={mockData.album}
		// 		dateAdded={mockData.dateAdded}
		// 		index={1}
		// 	/>

      // expect(screen.getByText('song title')).toBeTruthy()
      // expect(screen.getByText('01-02-2020')).toBeTruthy()
      // expect(screen.getByText('albume name')).toBeTruthy()
      // expect(screen.getByText('1')).toBeTruthy()
      // expect(screen.getByText('artist name')).toBeTruthy()
      // expect(screen.getByAltText('track-image'))).toBeTruthy()
      // expect(screen.getByText('3:00')).toBeTruthy()


		// expect(screen.getAllByTestId("listitem-id").length).toBe(7);


  })
})
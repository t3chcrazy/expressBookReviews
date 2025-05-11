const fetchListOfBooks = async () => {
  const response = await fetch("http://localhost:5001")
  const bookList = await response.json()
  console.log({ bookList })
}

const fetchBookByISBN = async isbn => {
  const response = await fetch("http://localhost:5001/isbn/" + isbn)
  const bookByISBN = await response.json()
  console.log({ bookByISBN })
}

const fetchBookByAuthor = async author => {
  const response = await fetch("http://localhost:5001/author/" + author)
  const booksByAuthor = await response.json()
  console.log({ booksByAuthor })
}

const fetchBookByTitle = async title => {
  const response = await fetch("http://localhost:5001/title/" + title)
  const bookByTitle = await response.json()
  console.log({ bookByTitle })
}
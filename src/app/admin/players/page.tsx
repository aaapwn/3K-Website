import auth from "@/libs/auth"
import ListUsers from "@/views/ListUsers"

const page = async () => {
  const session = await auth()
  return (
    <ListUsers session={session} />
  )
}

export default page

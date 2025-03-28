import { getServerSession } from 'next-auth'
import { authOptions } from './authOptions'

const auth = async () => {
    const session = await getServerSession(authOptions)
    return session
}
export default auth
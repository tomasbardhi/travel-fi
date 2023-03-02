function UserComponent({ username, signOut }: { username: string | null | undefined, signOut: () => {} }) {
    return (
        <>
            <button onClick={() => signOut()}>Sign Out</button>
            {
                username
                    ?
                    <h1>Hi, {username}!</h1>
                    :
                    <h1>Hi!</h1>
            }
        </>
    )
}

export default UserComponent
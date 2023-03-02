import styles from "@/styles/UserComponent.module.scss"

function UserComponent({ username, signOut }: { username: string | null | undefined, signOut: () => {} }) {


    return (
        <div className={styles.main}>
            <div className={styles.user}>
                {
                    username
                        ?
                        <div><span className={styles.greeting}>Hello, </span><span className={styles.userName}>{username}</span></div>
                        :
                        <h1>Hi!</h1>
                }
            </div>
            <div className={styles.actions}>
                <button onClick={() => signOut()}>Sign Out</button>
            </div>
        </div>
    )
}

export default UserComponent


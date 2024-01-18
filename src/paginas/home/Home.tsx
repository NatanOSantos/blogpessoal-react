
function Home() {

    return (
        <>
            <div style={{ /* primeira div ocupa a tela toda */
                width: "100vw",
                display: "flex",
                justifyContent: "center"
            }}>
                <div>
                    <div style={{ /* Tipo um sub container. Esse sub container vai ter 2 divs, uma dos textos e outra das imagens */
                        width: "80vw",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}>
                        <h2>Boas vindas!</h2>
                        <p>Conte aqui sua experiência:</p>
                    </div>
                    <div style={{
                        width: "80vw",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}>
                        <img
                            src="https://i.imgur.com/VpwApCU.png"
                            alt="Imagem da Página Home"
                            width="400px"></img>

                    </div>
                </div>
            </div>
        </>
    )
}

export default Home
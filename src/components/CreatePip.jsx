import react, { useState } from "react";
import PipItem from "./PipItem";
import { Pip } from "../entities/pip";
import ReactModal from "react-modal";

// Laver funktionen der laver et nyt pip
export function CreatePip(){
  // Bruger useState til Content & modal da deres tilstand skal kunne ændre alt afhængigt af brugerens actions.
    const [content, setContent] = useState('');
    const [isOpen, setIsOpen] = useState (false);

    // laver et object der indeholder en masse data ift. text og farve på pip post
    const pipDummyData= [ 
        new Pip('Håber det her virker', new Date(), 1),
        
        // {
        //     content: 'Hvis det ikke virker bliver jeg meget ked af det',
        //     isCompleted: true, 
        //     created: new Date(),
        //     priority: 1,
        // },
        // {
        //     content: 'Jeg er sku lidt træt',
        //     isCompleted: true, 
        //     created: new Date(),
        //     priority: 2, 
        // }
    ];

    // Sætter pipdataten i en useState så dataen kan ændres på baggrund af brugerens handlinger. 
    const [pips, setPips] = useState(pipDummyData);


    // vi sætter den til at tracke det vi skriver såm den ved hvad den skal poste
    const handlePipContentChange = (e) => {
        setContent(e.target.value)
    }

    const handleAddPipClick = () => {
        // Opretter nyt pip objekt for at tilføje det til array'et af todos.
        // Hardcoded "dummy" deadline 2024-01-01, priority 1, labels []
        const newPip = new Pip(content, new Date(), 1)
    
        // kalde setPips og sende det tidligere todos array + mit nye todo obj. ind.
        
        // oprette et nyt array, indsætte todos objekter, tilføjer den den nye todo
        // kalder setPips med det nye todos array som parameter.
        // google js-spread operator
        setPips([...pips, newPip]) 

        // Lukker modalet når man indputter data
        handleCloseModal()
        // setContent('') gør at når man tilføjer og lukker modalet så clear den input feltet
        setContent('')
      }

      function handleOpenModal(){
        setIsOpen(true)
      }
      function handleCloseModal(){
        setIsOpen(false)
      }


      return(
        <main>

        <div className="list">
          <div className="add-container">
            <ReactModal isOpen={isOpen}> 
                <input className="pipInput" type="text" placeholder="What's on your mind?" value={content} onChange={handlePipContentChange}/>
                <button className="add-button" onClick={handleCloseModal}>Close</button>
                <button className="add-button" onClick={handleAddPipClick}>Pip</button>
            </ReactModal>

            <h2 className="home">Home</h2>
            <button className="add-button" onClick={handleOpenModal}>Pip</button>
          </div>
          {/* Vi sender data ind i pipItem via Props og kalder den content */}
          {/* slice() bruges til at lave en overfladsik kopi af dit array af objects og når man kombinere det med reverse() tager den kopien man lavede med slice() og reverser rækkefølgen. */}
          {pips.slice().reverse().map(pip => {
            // key={pip.content} burde være et unikt id
            return <PipItem key={pip.content} pipItem={pip}/>
          })}
        </div>
      </main>
      )
}
import React from 'react'

const wrapperStyle = {
  color: 'red',
  backgroundColor: 'white',
  font: 'initial',
  marginLeft: 'auto',
  marginRight: 'auto',
  width: '320px',
}

const descriptionStyle = {
  color: 'blue',
  fontSize: '140%',
  textAlign: 'center',  
}

const fieldStyle = {
  display: 'grid',
  gridGap: '10px',
  gridTemplateColumns: '100px 100px 100px',
}

const cellStyle = {
  height: '100px',
  backgroundColor: 'gray',
  color: 'white',
  fontSize: '90px',
  textAlign: 'center',
}

const defaultGameField = [
  '', '', '',
  '', '', '',
  '', '', '',
]

class Game extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      gameField: defaultGameField,
      currentSymbol: 'X',
    }
  }

  render() {
    return( 
      <div style={wrapperStyle}>
        <div style={descriptionStyle}>
          {this.getDescription()}
        </div>
        {this.renderCellGrid()}
      </div>
    )
  }

  getDescription() {
    const {
      gameField,
      currentSymbol,
    } = this.state
    const isEmpty = elem => elem === ''
    const previousSymbol = currentSymbol === 'X'
      ? 'O'
      : 'X'

    if(this.isSymbolWin(previousSymbol)) {
      return `Winner is ${previousSymbol}`
    } else if(gameField.every(isEmpty)) {
      return `New game! ${currentSymbol} turn`
    } else if(gameField.some(isEmpty)) {
      return `${currentSymbol} turn`
    }

    return 'No one wins'
  }

  renderCellGrid() {
    return(
      <div style={fieldStyle}>
        { this.state.gameField
            .map((item, position) => this.getCell(item, position)) }
      </div>
    )
  }

  getCell(cellValue, cellPosition) {
    return(
      <div
        style={cellStyle}
        key={cellPosition}
        onClick={() => this.clickHandler(cellValue, cellPosition)}  
      >
        {cellValue}
      </div>
    )
  }

  clickHandler(cellValue, cellPosition) {
    const {
      gameField,
      currentSymbol,
     } = this.state
    const previousSymbol = currentSymbol === 'X'
      ? 'O'
      : 'X'

    if(this.isSymbolWin(previousSymbol) || gameField.every(elem => elem !== '')) {
      this.startNewGame()
    } else if(cellValue === '') {
      const newGameField = [...gameField]

      newGameField[cellPosition] = currentSymbol

      this.setState({
        gameField: newGameField,
        currentSymbol: previousSymbol
      })
    }
  }

  startNewGame() {
    const newSymbol = this.state.currentSymbol !== 'X'
      ? 'X'
      : 'O'

    this.setState({
      gameField: defaultGameField,
      currentSymbol: newSymbol,
    })
  }

  isSymbolWin(checkingSymbol) {
    const checkTypes = [
      'horizontal',
      'vertical',
      'diagonal',
      'inverse diagonal',
    ]

    return checkTypes
      .some(checkingType => this.isSequenceWin(checkingSymbol, checkingType))
  }

  isSequenceWin(checkingSymbol, checkingType) {
    return this.prepareGameFieldToCheck(checkingType)
      .some(item => item.every(elem => elem === checkingSymbol))
  }

  prepareGameFieldToCheck(checkingType) {
    let [
      p1, p2, p3,
      p4, p5, p6,
      p7, p8, p9,
    ] = this.state.gameField

    switch(checkingType) {
      case 'horizontal':
        return [
          [p1, p2, p3],
          [p4, p5, p6],
          [p7, p8, p9],
        ]
      case 'vertical':
        return [
          [p1, p4, p7],
          [p2, p5, p8],
          [p3, p6, p9],
        ]
      case 'diagonal':
        return [[p3, p5, p7]]
      case 'inverse diagonal':
        return [[p1, p5, p9]]
      default:
        console.error(`invalid checking type: ${checkingType}`)
    }
  }
}

export default Game

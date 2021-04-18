import { observer } from 'mobx-react-lite';
import React from 'react';
import { FixedSizeGrid as Grid, GridChildComponentProps } from 'react-window';
import { field, BOMB } from '../../store/GameField';
import { cn as createCn } from '@bem-react/classname'

import './GameField.css';

// import {field} from '../../store/GameField';

// export {field};

// export const GameField: React.FC = () => {
//     return (
//         <div className="Field">
//             {Array(10000).fill(undefined).map((v, i) => (
//                 <div key={i} />
//             ))}
//         </div>
//     );
// }

const cn = createCn('cell');

// todo м б вынести обертку, но хз, много компонентов. Если не тормозит то не надо
const Cell: React.FC<GridChildComponentProps> = observer(({ columnIndex, rowIndex, style }) => {
    // if (columnIndex === 5 && rowIndex === 5) {
    //   console.log('render');
    // }
    // return <div className={cn()} style={style} />
    const cell = field.getCell(columnIndex, rowIndex);
    const isOpen = cell.isOpen;
    let value = isOpen ? field.getCellValue(columnIndex, rowIndex) : undefined;
  
    return (
        <div
            className={cn({val: isOpen ? value : undefined})}
            style={style}
            onMouseDown={() => cell.open()}
        >
            {cell.isOpen && value !== BOMB && value}
        </div>
    );
});

// const GridCell: React.FC<GridChildComponentProps> = ({ columnIndex, rowIndex, style, children }) => {
//   return (
//       <div style={style}>
//         <Cell columnIndex={columnIndex} rowIndex={rowIndex} />
//       </div>
//   );
// };

export const GameField: React.FC = () => (
    <Grid
      className="Grid"
      columnCount={field.width}
      columnWidth={16}
      height={600}
      rowCount={field.height}
      rowHeight={16}
      width={800}
    >
      {Cell}
    </Grid>
  );
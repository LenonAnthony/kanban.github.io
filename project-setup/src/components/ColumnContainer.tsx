import TrashIcon from "../icons/TrashIcon";
import { Id } from "../types";
import { Column } from "../types";

interface Props {
    column: Column;
    deleteColumn: (id: Id) => void;
}

function ColumnContainer(props: Props) {
    const { column, deleteColumn } = props;
    return (
        <div
            className="
                bg-columnBackGroundColor
                w-[350px]
                h-[500px]
                max-h-[500px]
                rounded-md
                flex
                flex-col
        ">
            {/* Título das colunas */}
            <div
                className="
                bg-mainBackGroundColor
                text-md
                h-[60px]
                cursor-grab
                rounded-md
                rounded-b-none
                p-3
                font-bold
                border-columnBackGroundColor
                border-4
                flex
                items-center
                justify-between
            ">
                <div className = "flex gap-2">
                    <div
                        className="
                            flex
                            justify-center
                            items-center
                            bg-columnBackGroundColor
                            px-2
                            py-1
                            text-sm
                            rounded-full
                    ">
                        0
                    </div>
                    {column.title}
                </div>
                <button
                onClick = {() => {
                    deleteColumn (column.id);
                }}
                    className="
                        stroke-gray-500
                        hover:stroke-white
                        hover:bg-columnBackGroundColor
                        rounded
                        px-1
                        py-2
                ">
                    <TrashIcon />
                </button>
            </div>
            {/* Container das tasks relativas as colunas */}
            <div className = "flex flex-grow">Conteúdo</div>
            {/* Rodapé das colunas */}
            <div className = "">Rodapé</div>
        </div>
    ) 
}

export default ColumnContainer;
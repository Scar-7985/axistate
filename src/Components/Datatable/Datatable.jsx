import { default as SimpleDataTable } from 'datatables.net-react';
import DT from 'datatables.net-dt';
// import "./Datatable.css"

SimpleDataTable.use(DT);

export const DataTable = ({ loadingState = true, children: dataList, ...dataListProps }) => {
    if (loadingState) {
        return <h5 className='text-center'>
            <button className="btn btn-primary btn-icon btn-rounded is-loading">
                <i className="anticon anticon-loading"></i>
            </button>
        </h5>;
    }

    return (
        <SimpleDataTable
            className="datatable table dataTable no-footer"
            options={{
                pageLength: 10,
                lengthMenu: [10, 25, 50, 100],
                pagingType: "simple_numbers",
                language: {
                    lengthMenu: 'Show _MENU_ entries',
                    paginate: { previous: "Previous", next: "Next" },
                    emptyTable: `
            <div className="text-center">
              <img src="/assets/images/others/nodb.png" style="border-radius:10px;max-width:150px;" />
              <div className="mt-3 text-danger">There is no data to show you at the moment.</div>
            </div>
          `
                }
            }}
            {...dataListProps}
        >
            {dataList}
        </SimpleDataTable>
    );
};

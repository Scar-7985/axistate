import { default as SimpleDataTable } from 'datatables.net-react';
import DT from 'datatables.net-dt';
import "./Datatable.css"
import "../../Components/Loading/Loading.css"

SimpleDataTable.use(DT);

export const DataTable = ({ loadingState = true, children: dataList, ...dataListProps }) => {
    if (loadingState) {
        return <h5 className='text-center' style={{ height: "50px" }}>
            <div class="load-3">
                <div class="line"></div>
                <div class="line"></div>
                <div class="line"></div>
            </div>
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
            <div className="d-flex align-items-center">
              <img src="/assets/images/nodata.svg" style="border-radius:10px;height:250px;" />
              <div className="m" style="font-size:16px;font-weight:500; color: #161E2D;">There is no data to show you at the moment.</div>
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

import React, { Component } from 'react';

class PaginationComponent extends Component {
    constructor(props) {
        super(props);
        this.buildArray = this.buildArray.bind(this);
    }
    range(start, end) {
        return Array.from({ length: end - start }, (v, k) => k + start);
    }
    buildArray(totalPages, page) {
        if (totalPages > 5) {
            let x = totalPages - page;

            if (x == 0) return this.range(page - 4, page + 1);
            if (x == 1) return this.range(page - 3, page + 2);
            if (x == 2) return this.range(page - 2, page + 3);
            if (page == 1) return this.range(1, page + 5);
            if (page == 2) return this.range(1, page + 4);

            return this.range(page - 2, page + 3);
        }
        return this.range(1, totalPages + 1);
    }
    render() {
        const { onPageChange, pageSize, total, page, className } = this.props;
        let totalpages = Math.ceil(total / pageSize);
        if (!!!totalpages || totalpages <= 1) {
            return <noscript />;
        }
        return (
            <ul className={className || 'pagination justify-content-center align-items-center float-left'}>
                <li style={{ marginRight: 15, fontWeight: 'normal' }}>
                    <span>Trang:</span>
                    <span style={{ marginLeft: 5, fontWeight: 'bold' }}>{`${page}/${totalpages}`}</span>
                </li>
                {page > 1 && (
                    <li className="page-item">
                        <a className="page-link" onClick={e => onPageChange(page - 1)} href="javascript:void(0)">
                            <i className="fa fa-angle-left" />
                        </a>
                    </li>
                )}
                {page > 3 && totalpages > 5 && (
                    <li className="page-item">
                        <a className="page-link" onClick={e => onPageChange(1)} href="javascript:void(0)">
                            1
                        </a>
                    </li>
                )}
                {totalpages > 5 && page > 4 && (
                    <li className="page-item">
                        <a className="page-link" href="javascript:void(0)">
                            ...
                        </a>
                    </li>
                )}

                {this.buildArray(totalpages, page).map(p => {
                    let css = p == page ? ' page-item active' : 'page-item';
                    return (
                        <li key={p} className={css}>
                            <a className="page-link" onClick={e => onPageChange(p)} href="javascript:void(0)">
                                {p}
                            </a>
                        </li>
                    );
                })}
                {totalpages > 5 && totalpages - page > 3 && (
                    <li className="page-item">
                        <a className="page-link" href="javascript:void(0)">
                            ...
                        </a>
                    </li>
                )}
                {totalpages > 5 && totalpages - page > 3 && (
                    <li className="page-item">
                        <a className="page-link" onClick={e => onPageChange(totalpages)} href="javascript:void(0)">
                            {totalpages}
                        </a>
                    </li>
                )}
                {page < totalpages && (
                    <li className="page-item">
                        <a className="page-link" onClick={e => onPageChange(page + 1)} href="javascript:void(0)">
                            <i className="fa fa-angle-right" />
                        </a>
                    </li>
                )}
                <li style={{ marginLeft: 15, fontWeight: 'normal' }}>
                    <span>Tổng số: </span>
                    <span style={{ fontWeight: 'bold', marginLeft: 5, marginRight: 5 }}>{total}</span>
                    <span>kết quả</span>
                </li>
            </ul>
        );
    }
}

export default PaginationComponent;

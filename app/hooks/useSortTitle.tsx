export default function useSortByCriteria(data: any[], criteria: any) {
    return data.sort(function (a: { [x: string]: any; }, b: { [x: string]: any; }) {

      const aTitle = a['title'];
      const bTitle = b['title'];
      const aDate = a['id'];
      const bDate = b['id'];
      const aActive = a['is_active'];
      const bActive = b['is_active'];
  
      switch(criteria) {
        case "A-Z" : {
          return aTitle.localeCompare(bTitle);
        };
        case "Z-A" : {
          return bTitle.localeCompare(aTitle);
        };
        case "Terlama" : {
          return aDate - bDate
        };
        case "Terbaru" : {
          return bDate - aDate;
        };
		case "Belum Selesai" : {
			return aActive - bActive
		}
      }
      
    });
  }
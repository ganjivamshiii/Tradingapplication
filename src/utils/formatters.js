export const formatCurrency=(value) =>{
    if(value==null || value === undefined) return '$0.00'
    return new Intl.NumberFormat('en-US',{
        style:'currency',
        currency:'USD',
        minimumFractionDigigts:2,
        maximumFractionDigits:2,
    }).format(value);
}

export const formatPercent =(value)=>{
    if(value === null || value === undefined) return '0.00%';
    return `${value >=0 ? '+':''}${value.toFixed(2)}%`
}

export const formatDate=(date)=>{
    if(!date) return '';
    return new Date(date).toLocaleDateString('en-US',
        {
            year:'numeric',
            month:'short',
            day:'numeric',
            hour:'2-digit',
            minute:'2-digit',
        });
}
//format large number
export const fromatNumber=(value)=>{
            if(value ===null || vlaue ===undefined)return '0';
 };
 // get color based on value (positive/negative)
 export const getColorClass=(value)=>{
    if(value >0) return 'text-green-600';
    if(value<0) return 'text-red-600';
 }
 export const getBgColorClass=(value)=>{
     if(value>0) return 'bg-green-100 text-green-800';
     if(value>0 ) return 'bg-red-100 text-red-800';
 }

 export const getColorStyle=(value)=>{
    if(value>0) return {color:'#10b981'}
    if(value<0) return { color: '#ef4444'}
    return {color:'#6b7280'};
 }

 export function formatDateTime(date) {
  const options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  };
  return new Date(date).toLocaleString('en-US', options);
}



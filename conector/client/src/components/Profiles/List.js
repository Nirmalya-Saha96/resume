import Item from './Items';

export default function List({contacts}) {
    return (
        <div>
            {contacts.map(contact => (
                <Item key={contact._id} profile={contact} />
            ))}
        </div>
    )
}

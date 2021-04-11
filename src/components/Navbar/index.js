import { Container, DropdownStyles } from './styles';
import { DropdownOption } from '../Dropdown';
import { Products, Developers, Company } from '../Content';

function Navbar() {
    return (
        <DropdownStyles>
            <Container>
                <ul>
                    <li>
                        <DropdownOption name="Produtos" content={Products} />
                    </li>
                    <li>
                        <DropdownOption name="Desenvolvedores" content={Developers} />
                    </li>
                    <li>
                        <DropdownOption name="Empresa" content={Company} />
                    </li>
                </ul>
            </Container>
        </DropdownStyles>
    )
}

export default Navbar;

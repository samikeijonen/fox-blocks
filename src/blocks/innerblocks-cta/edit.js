const {
	Component,
	Fragment,
} = wp.element;

// Register editor components.
const {
	AlignmentToolbar,
	BlockControls,
	InnerBlocks,
} = wp.editor;

import classnames from 'classnames';

import { hot } from 'react-hot-loader/root';

class InnerBlocksEdit extends Component {
	constructor( props ) {
		super();
	}

	render() {
		const { attributes, className, setAttributes } = this.props;
		const { alignment } = attributes;

		const classNameEdit = classnames(
			'callout',
			{ [ `text-${ alignment }` ]: alignment },
			className
		);

		const styles = {
			textAlign: alignment,
		};

		return (
			<Fragment>
				<BlockControls>
					<AlignmentToolbar
						value={ alignment }
						onChange={ ( nextAlign ) => setAttributes( { alignment: nextAlign } ) }
					/>
				</BlockControls>
				<div style={ styles } className={ classNameEdit ? classNameEdit : undefined }>
					<InnerBlocks
						allowedBlocks={ [ 'core/heading', 'core/paragraph', 'core/button', 'core/cover' ] }
						template={ [
							[ 'core/heading' ],
							[ 'core/paragraph' ],
							[ 'core/button' ],
						] }
						templateLock={ false }
					/>
				</div>
			</Fragment>
		);
	}
}

export default hot( InnerBlocksEdit );

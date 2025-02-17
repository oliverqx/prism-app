import { createStyles, Drawer, makeStyles, Theme } from '@material-ui/core';
import React, { memo, useMemo } from 'react';
import { LayersCategoryType, MenuItemType, PanelSize } from 'config/types';
import AnalysisPanel from './AnalysisPanel';
import ChartsPanel from './ChartsPanel';
import LeftPanelTabs from './LeftPanelTabs';
import TablesPanel from './TablesPanel';
import { menuList } from './utils';

interface StyleProps {
  panelSize: PanelSize;
}

const useStyles = makeStyles<Theme, StyleProps>(() =>
  createStyles({
    paper: {
      marginTop: '7vh',
      height: '93%',
      width: ({ panelSize }) => panelSize,
      backgroundColor: '#F5F7F8',
      maxWidth: '100%',
    },
  }),
);

const LeftPanel = memo(
  ({ panelSize, setPanelSize, isPanelHidden }: LeftPanelProps) => {
    const classes = useStyles({ panelSize });

    const [
      resultsPage,
      setResultsPage,
    ] = React.useState<React.JSX.Element | null>(null);

    const tablesMenuItems = useMemo(() => {
      return menuList.filter((menuItem: MenuItemType) => {
        return menuItem.layersCategories.some(
          (layerCategory: LayersCategoryType) => {
            return layerCategory.tables.length > 0;
          },
        );
      });
    }, []);

    const areTablesAvailable = useMemo(() => {
      return tablesMenuItems.length >= 1;
    }, [tablesMenuItems.length]);

    return (
      <Drawer
        variant="persistent"
        anchor="left"
        open={!isPanelHidden}
        classes={{ paper: classes.paper }}
      >
        <LeftPanelTabs
          panelSize={panelSize}
          setPanelSize={setPanelSize}
          areTablesAvailable={areTablesAvailable}
          resultsPage={resultsPage}
          chartsPanel={
            <ChartsPanel
              setPanelSize={setPanelSize}
              setResultsPage={setResultsPage}
            />
          }
          analysisPanel={
            <AnalysisPanel
              panelSize={panelSize}
              setPanelSize={setPanelSize}
              setResultsPage={setResultsPage}
            />
          }
          tablesPanel={
            <TablesPanel
              tablesMenuItems={tablesMenuItems}
              setPanelSize={setPanelSize}
              setResultsPage={setResultsPage}
            />
          }
        />
      </Drawer>
    );
  },
);

interface LeftPanelProps {
  panelSize: PanelSize;
  setPanelSize: React.Dispatch<React.SetStateAction<PanelSize>>;
  isPanelHidden: boolean;
}

export default LeftPanel;
